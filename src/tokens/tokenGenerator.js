const StyleDictionaryPackage = require('style-dictionary');
const del = require('del');

const outputPath = `./dist`;
const brands = [`bilbasen`, `dba`];
const platforms = ['web', 'ios', 'android'];
const themes = [`default`, `dark`];

const routeGenerator = (theme) => theme === 'default' ? `!(*.${themes.join(`|*.`)})` : `*.${theme}`
const extensionGenerator = (theme) => theme === 'default' ? `` : `.${theme}`

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function tokenConfig(theme, brand, platform) {

  return {

    // Include will deep merge the files only overriding the theme values

    "include": [
      `config/brands/${brand}/${routeGenerator('default')}.json`,
      `config/global/**/${routeGenerator('default')}.json`,
      `config/platforms/${platform}/${routeGenerator('default')}.json`
    ],

    // The source order is specific and controls the deep merge overrides. Brands > Global > Platforms.

    "source": [
      `config/brands/${brand}/${routeGenerator(theme)}.json`,
      `config/global/**/${routeGenerator(theme)}.json`,
      `config/platforms/${platform}/${routeGenerator(theme)}.json`
    ],

    "platforms": {
      // 🕸 Web

      "web": {
        "transformGroup": "web",
        "buildPath": `${outputPath}/web/${brand}/`,
        "files": [{
          "destination": `scss/_config${extensionGenerator(theme)}.scss`,
          "format": "scss/variables"
        },
        {
          "destination": `css/config${extensionGenerator(theme)}.css`,
          "format": "css/variables"
        },
        {
          "destination": `json/config${extensionGenerator(theme)}.json`,
          "format": "json/nested"
        }],
        "options": {
          "outputReferences": true
        }
      },

      // 🤖 Android

      "android": {
        "transformGroup": "android",
        "buildPath": `${outputPath}/android/${brand}/`,
        "files": [{
          "destination": `config.colors${extensionGenerator(theme)}.xml`,
          "format": "android/colors"
        }],
        "options": {
          "outputReferences": true
        }
      },

      // 🍏 IOS

      "ios": {
        "transformGroup": "ios",
        "buildPath": `${outputPath}/ios/${brand}/`,
        "files": [{
          "destination": `config${extensionGenerator(theme)}.h`,
          "format": "ios/macros"
        }],
        "options": {
          "outputReferences": true
        }
      }
    },

  }
};

// 🦾 Build function

(async () => {

  // ✨ Clean

  try {
    console.log(`\nCleaning up the ${outputPath} folder..`);

    await del(outputPath);

    console.log(`\n✨ All clean ✨\n`);

    console.log('==============================================\n');

  } catch (err) {

    console.error(`Error while deleting ${outputPath} folder`);
  }

  // 👷 Build – Looping over the tokenConfig Brand > Theme > Platform.

  console.log('👷 Build started... 👷');

  brands.map(function (brand) {
    console.log('\n==============================================');
    console.log(`\n${brand.toUpperCase()}`);

    themes.map(function (theme) {

      console.log(`\nBuilding the ${theme.toUpperCase()} theme...`);

      platforms.map(function (platform) {
        const StyleDictionary = StyleDictionaryPackage.extend(tokenConfig(theme, brand, platform));

        StyleDictionary.buildPlatform(platform);
      })
    })
  })
  console.log('\n==============================================');
  console.log('\n🥳 Build completed! 🥳\n');

})();
