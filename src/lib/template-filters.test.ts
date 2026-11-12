import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Template } from '@/types';
import {
  DEFAULT_FILTERS,
  countActive,
  filterTemplates,
  filtersToQuery,
  getTemplatePalette,
  parseFilters,
} from './template-filters';

const t = (o: Partial<Template>): Template =>
  ({
    id: 'x', name: 'X', description: '', category: 'saas', tier: 'free', tags: [], rating: 4, downloads: 1,
    createdAt: '2026-01-01', previewImage: '', livePreviewUrl: '', ...o,
  }) as Template;

const LIST = [
  t({ id: 'a', name: 'Coffee Bar', category: 'restaurant', tier: 'free', rating: 4.2, downloads: 50, createdAt: '2026-03-01' }),
  t({ id: 'b', name: 'Rocket', description: 'Space COFFEE shop', category: 'space', tier: 'pro', rating: 4.9, downloads: 10, createdAt: '2026-05-01' }),
  t({ id: 'c', name: 'Folio', category: 'portfolio', tier: 'basic', tags: ['Minimal', 'coffee-lovers'], rating: 4.5, downloads: 99, createdAt: '2026-01-01' }),
];

test('search matches name, description and tags, case-insensitive', () => {
  const r = filterTemplates(LIST, { ...DEFAULT_FILTERS, q: 'cOfFeE' }, []);
  assert.deepEqual(r.map((x) => x.id).sort(), ['a', 'b', 'c']);
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, q: 'minimal' }, []).map((x) => x.id), ['c']);
});

test('tier and category filters', () => {
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, tier: 'pro' }, []).map((x) => x.id), ['b']);
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, category: 'portfolio' }, []).map((x) => x.id), ['c']);
});

test('saved filter uses favourites', () => {
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, saved: true }, ['b']).map((x) => x.id), ['b']);
});

test('palette filter uses getTemplatePalette', () => {
  assert.equal(getTemplatePalette({ category: 'space' }), 'cyan');
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, palette: 'cyan' }, []).map((x) => x.id), ['b']);
});

test('sorting', () => {
  assert.deepEqual(filterTemplates(LIST, DEFAULT_FILTERS, []).map((x) => x.id), ['c', 'a', 'b']);
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, sort: 'rating' }, []).map((x) => x.id), ['b', 'c', 'a']);
  assert.deepEqual(filterTemplates(LIST, { ...DEFAULT_FILTERS, sort: 'newest' }, []).map((x) => x.id), ['b', 'a', 'c']);
});

test('parseFilters ignores invalid values', () => {
  const f = parseFilters(new URLSearchParams('tier=gold&sort=weird&palette=neon&category=space&q=hi&saved=1'));
  assert.equal(f.tier, 'all');
  assert.equal(f.sort, 'popular');
  assert.equal(f.palette, 'all');
  assert.equal(f.category, 'space');
  assert.equal(f.q, 'hi');
  assert.equal(f.saved, true);
});

test('filtersToQuery omits defaults and round-trips', () => {
  assert.equal(filtersToQuery(DEFAULT_FILTERS), '');
  const f = { ...DEFAULT_FILTERS, q: 'coffee bar', tier: 'free' as const, sort: 'rating' as const };
  assert.deepEqual(parseFilters(new URLSearchParams(filtersToQuery(f))), f);
});

test('countActive counts non-default filters except search and sort', () => {
  assert.equal(countActive(DEFAULT_FILTERS), 0);
  assert.equal(countActive({ ...DEFAULT_FILTERS, q: 'x', sort: 'rating' }), 0);
  assert.equal(countActive({ ...DEFAULT_FILTERS, tier: 'pro', saved: true, palette: 'cyan', category: 'saas' }), 4);
});
