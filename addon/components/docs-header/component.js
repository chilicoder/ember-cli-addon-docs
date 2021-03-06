import Component from '@ember/component';
import layout from './template';
import config from 'dummy/config/environment';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { addonLogo } from 'ember-cli-addon-docs/utils/computed';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

const { projectName, projectHref } = config['ember-cli-addon-docs'];

/**
  Render a header showing a link to your documentation, your project logo, a
  search bar, and a link to your repo on GitHub.

  Yields a `link` contextual component which can be used to add additional
  header links.

  ```hbs
  {{#docs-header as |header|}}
    {{#header.link 'sandbox'}}
      Sandbox
    {{/header.link}}
  {{/docs-header}}
  ```

  @class DocsHeader
  @public
  @yield {Hash} header
  @yield {Component} header.link
*/
export default Component.extend({
  layout,
  tagName: '',

  projectVersion: service(),

  projectHref,

  didInsertElement() {
    this._super(...arguments);
    this.get('projectVersion').loadAvailableVersions();
  },

  logo: addonLogo(projectName),

  name: computed(function() {
    let name = projectName;
    name = name.replace('ember-data-', '');
    name = name.replace('ember-cli-', '');
    name = name.replace('ember-', '');

    return classify(name);
  }),

  currentVersion: reads('projectVersion.currentVersion'),

  actions: {
    didVisitPage() {
      this.set('query', null);
      let search = document.querySelector('[data-search-box-input]');
      search.blur();
    }
  }

});
