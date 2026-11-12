import { test } from 'node:test';
import assert from 'node:assert/strict';
import { templateStatsLabel } from './template-stats';

test('unrated template is labelled New with no invented numbers', () => {
  assert.deepEqual(templateStatsLabel({ rating: 0, downloads: 0 }), { isNew: true });
});

test('rated template shows rating and downloads', () => {
  assert.deepEqual(templateStatsLabel({ rating: 4.8, downloads: 1234 }), {
    isNew: false,
    rating: '4.8',
    downloads: '1,234',
  });
});
