const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const distPath = `./dist`;
const webPath = `./dist/web`;
const iosPath = `./dist/ios`;
const androidPath = `./dist/android`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨

console.log(`\nCleaning up the ${distPath} folder..`);
fs.removeSync(distPath);
console.log(`\n✨ All clean ✨\n`);

console.log('🔨 Build started...');

const brands = [`bilbasen`, `dba`];
const modes = [`light`, `dark`];

console.log(`☀️ Building light mode...`);
StyleDictionary.extend({
  source: [
    // this is saying find any files in the tokens folder
    // that does NOT have .dark or .light, but ends in .json
    `config/**/!(*.${modes.join(`|*.`)}).json`
  ],

  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `${distPath}/config.css`,
        format: `css/variables`,
        options: {
          outputReferences: true
        }
      }]
    },

    js: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `${distPath}/config.json`,
        format: `json/nested`
      }]
    },

    scss: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `${distPath}/_config.scss`,
        format: `scss/variables`
      }],
      options: {
        outputReferences: true
      }
    },

    iOS: {
      transformGroup: `ios`,
      buildPath: iosPath,
      files: [{
        destination: `${distPath}/config.h`,
        format: `ios/macros`,
        options: {
          outputReferences: true
        }
      }]
    },

    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `${distPath}/config.colors.xml`,
        format: `android/resources`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          // this is important!
          // this will keep token references intact so that we don't need
          // to generate *all* color resources for dark mode, only
          // the specific ones that change
          outputReferences: true
        }
      }]
    }
  }
}).buildAllPlatforms();

// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌙 Building dark mode...`);
styleDictionary.extend({
  // Using the include array so that theme token overrides don't show
  // warnings in the console. 
  include: [
    `config/**/!(*.${modes.join(`|*.`)}).json`
  ],
  source: [
    `config/**/*.dark.json`
  ],
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `${distPath}/config-dark.css`,
        format: `css/variables`,
        // only putting in the tokens from files with '.dark' in the filepath
        filter: (token) => token.filePath.indexOf(`.dark`) > -1,
        options: {
          outputReferences: true
        }
      }]
    },
  }
}).buildAllPlatforms();