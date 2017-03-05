import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

let db = require('../imports/startup/db.json');

Meteor.startup(() => {
  render(<App data={db} />, document.getElementById('render-target'));
});
