// Installs the packed tarball in a temporary project and checks the ESM, CJS
// and UMD (`<script>` tag) builds.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const dir = mkdtempSync(join(tmpdir(), 'feature-toggle-service-'));

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { cwd: dir, stdio: 'inherit', ...opts });

const check = (name, code) => {
  console.log(`\n▶ ${name}`);
  run(process.execPath, ['--input-type=module', '-e', code]);
};

try {
  run('npm', ['run', 'build'], { cwd: root });
  const [{ filename }] = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', dir], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    }),
  );
  writeFileSync(join(dir, 'package.json'), '{ "private": true }');
  run('npm', ['install', '--no-audit', '--no-fund', `./${filename}`]);

  check(
    'ESM',
    `
    import assert from 'node:assert/strict';
    import { createFeatureToggleService, isOn, set } from 'feature-toggle-service';

    set({ enabled: true, disabled: false });
    assert.equal(isOn('enabled'), true);
    assert.equal(isOn('disabled'), false);

    const service = createFeatureToggleService({ enabled: false });
    assert.equal(service.isOn('enabled'), false);
    assert.equal(isOn('enabled'), true);
    `,
  );

  check(
    'CJS',
    `
    import assert from 'node:assert/strict';
    import { createRequire } from 'node:module';
    const require = createRequire(process.cwd() + '/');
    const { isOn, set } = require('feature-toggle-service');

    set({ enabled: true });
    assert.equal(isOn('enabled'), true);
    `,
  );

  for (const file of ['feature-toggle-service.js', 'feature-toggle-service.min.js']) {
    console.log(`\n▶ UMD as <script>: ${file}`);
    const code = readFileSync(join(dir, 'node_modules/feature-toggle-service/dist/umd', file), 'utf8');
    // No `module`, `exports` or `define`, like a browser page
    const window = { console };
    vm.runInNewContext(code, Object.assign(window, { self: window, globalThis: window }));
    const { createFeatureToggleService, isOn, set } = window.FeatureToggleService;
    set({ enabled: true });
    assert.equal(isOn('enabled'), true);
    assert.equal(isOn('missing'), false);
    assert.equal(createFeatureToggleService({ enabled: false }).isOn('enabled'), false);
  }

  console.log('\n✔ Smoke test passed');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
