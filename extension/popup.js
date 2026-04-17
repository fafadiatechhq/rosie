'use strict';

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  activeView: 'scrape',
  openGroups: new Set(),
};

// ── DOM helpers ────────────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Navigation ─────────────────────────────────────────────────────────────
function activateView(viewId) {
  // Hide all views
  $$('.view').forEach(v => v.classList.remove('active'));

  // Show target view
  const target = $(`#view-${viewId}`);
  if (target) target.classList.add('active');

  state.activeView = viewId;

  // Update nav highlights
  $$('[data-nav]').forEach(el => {
    el.classList.remove('active');
  });

  // Mark active nav item / child
  const activeNavEl = $(`[data-view="${viewId}"]`);
  if (activeNavEl) activeNavEl.classList.add('active');

  // Mark parent nav item active if child is selected
  const group = activeNavEl?.closest('.nav-group');
  if (group) {
    const parentItem = group.querySelector('[data-nav]');
    if (parentItem) parentItem.classList.add('active');
  }
}

function toggleGroup(groupEl) {
  const groupName = groupEl.dataset.group;
  if (state.openGroups.has(groupName)) {
    state.openGroups.delete(groupName);
    groupEl.classList.remove('open');
  } else {
    state.openGroups.add(groupName);
    groupEl.classList.add('open');
  }
}

// ── Bind Navigation ────────────────────────────────────────────────────────
function bindNav() {
  // Top-level items with children → toggle group + don't navigate
  $$('.nav-item.has-children').forEach(item => {
    item.addEventListener('click', () => {
      const group = item.closest('.nav-group');
      if (group) toggleGroup(group);
    });
  });

  // Direct nav items (no children) → navigate
  $$('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', () => {
      activateView(item.dataset.view);
    });
  });

  // Child nav items → navigate
  $$('.nav-child[data-view]').forEach(child => {
    child.addEventListener('click', () => {
      activateView(child.dataset.view);
    });
  });
}

// ── Export format picker ────────────────────────────────────────────────────
function bindExportFormats() {
  $$('.format-option').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.format-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
}

// ── Use current tab button ──────────────────────────────────────────────────
function bindCurrentTab() {
  const btn = $('#use-current-tab');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0]?.url;
        if (url) $('#scrape-url').value = url;
      });
    }
  });
}

// ── Job card run/pause toggle ──────────────────────────────────────────────
function bindJobCards() {
  $$('.job-card').forEach(card => {
    const btn = card.querySelector('.btn-icon-sm');
    const badge = card.querySelector('.badge');
    if (!btn || !badge) return;

    btn.addEventListener('click', () => {
      const isPaused = badge.classList.contains('badge-paused');
      const isDone   = badge.classList.contains('badge-done');
      if (isDone) {
        // Re-run: flash to running
        badge.textContent = 'Running';
        badge.className = 'badge badge-running';
        btn.title = 'Pause';
        btn.querySelector('svg').innerHTML = `
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>`;
      } else if (isPaused) {
        badge.textContent = 'Running';
        badge.className = 'badge badge-running';
        btn.title = 'Pause';
        btn.querySelector('svg').innerHTML = `
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>`;
      } else {
        badge.textContent = 'Paused';
        badge.className = 'badge badge-paused';
        btn.title = 'Resume';
        btn.querySelector('svg').innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      }
    });
  });
}

// ── New Job shortcut (from jobs view) ─────────────────────────────────────
function bindNewJobBtn() {
  const btn = document.querySelector('#view-existing-jobs .btn-secondary');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Open "New" group and navigate to first child
    const newGroup = document.querySelector('[data-group="new"]');
    if (newGroup && !state.openGroups.has('new')) toggleGroup(newGroup);
    activateView('new-monitor');
  });
}

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  bindNav();
  bindExportFormats();
  bindCurrentTab();
  bindJobCards();
  bindNewJobBtn();

  // Open "New" group by default when Scrape is active (gives nice first look)
  // Actually start on scrape view, groups closed
  activateView('scrape');
}

document.addEventListener('DOMContentLoaded', init);
