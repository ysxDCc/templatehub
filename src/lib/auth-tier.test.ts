import { test } from 'node:test';
import assert from 'node:assert/strict';
import { templates } from '@/data/templates';
import { accessibleTemplates } from './auth-tier';

test('Pro bundle excludes Enterprise-only templates', () => {
  const pro = accessibleTemplates('pro', templates);
  assert.ok(pro.length > 0);
  assert.ok(pro.every((t) => t.tier !== 'enterprise'));
  assert.equal(pro.length, templates.filter((t) => t.tier !== 'enterprise').length);
});

test('Enterprise bundle includes every template', () => {
  assert.equal(accessibleTemplates('enterprise', templates).length, templates.length);
});

test('Free only gets free templates', () => {
  assert.ok(accessibleTemplates('free', templates).every((t) => t.tier === 'free'));
});
