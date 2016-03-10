lighten
=======================
The lighten UI.

Commands
-------------------------------------

```bash
npm run build            # creates a production bundle
npm run lint             # run eslint
npm run lint:fix         # attempt to fix lint errors
npm start                # run locally
npm run dev:debug-window # run locally with redux devtools in separate window
npm run dev:no-debug     # run locally with redux devtools disabled
npm test                 # run the tests once
npm run tdd              # run the tests continually (TDD mode)
```

Using the Redux devtools
-------------------------------------

After a successful `npm start`, you have probably noticed the devtools sliding panel hovering over your app. There are several different ways of presenting these devtools:

- Use them as-is if they are not bothering you.
- Open them in a new window with `npm run dev:debug-window`.
  - Note: You will need to enable pop-ups at `localhost:3000` in your browser for this to work. There will be a nasty angry red error until you enable pop-ups.
- Install the [browser extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) (the panel will hide automatically when you have it installed).
- Or just turn off the devtools with `npm run dev:no-debug`.
