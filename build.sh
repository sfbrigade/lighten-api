#!/bin/bash

cd lighten-ui
npm run build
node scripts/djangoize
