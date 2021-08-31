# SEC Directory Screens Client

[![Test and Build](https://github.com/seas-computing/sec-directory-client/actions/workflows/test-build.yml/badge.svg)](https://github.com/seas-computing/sec-directory-client/actions/workflows/test-build.yml)

This is the react-based client for the Directory Screen on the SEAS Allston Campus. It was bootstrapped with [Create React App][cra] using the default Typescript template.

## Setup

1. Clone this repo
2. Run `npm install` to get all dependencies
3. Copy `.env.example` to `.env` and populate with the desired Algolia details

## Local Development

`npm run start` will bring up a live development environment with hot-reloading. Once it's started, you can view the app in the browser at http://localhost:3000/.

As we're building for specific 55" touch screen displays ([Planar PS5561T][planar]) in portrait mode, the design of the page is fixed to a 1080x1920 rectangle with scrolling disabled. To view the application on a standard screen, you can use the [Responsive Design Mode][rdm] built into most browsers to emulate a 1080x1920 viewport.

The only outbound data connections are to Algolia, so the server project does not need to be running at the same time.

### Testing

`npm run test` Will run the Jest test suite. By default, jest will run in watch mode and re-run tests whenever the code changes on disk. For more information on Jest and its features, see [the project homepage][jest].

For testing our front-end code, we're relying on [React Testing Library][rtl] and favoring behavior-based testing.

## Production Build

`npm run build` will compile the full application in `/build`.

The official build of our code is handled by GitHub actions, and will be published to the [releases section][releases] on every push to our main branch if all the tests pass.

In production, the app will be server from an Amazon S3 bucket behind CloudFront.

[cra]: https://create-react-app.dev/
[planar]: https://www.planar.com/products/large-format-displays/ps4k/planar-ps5561t/
[rdm]: https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode
[jest]: https://jestjs.io/
[rtl]: https://testing-library.com/docs/react-testing-library/intro/
[releases]: https://github.com/seas-computing/sec-directory-client/releases
