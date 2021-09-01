const StyleDictionaryPackage = require('style-dictionary');
const del = require('del');

const outputPath = `./dist`;
const brands = [`bilbasen`, `dba`];
const platforms = ['web', 'ios', 'android'];
const themes = [`light`, `dark`];

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function lightThemeConfig(brand, platform) {
  return {
    "source": [
      `config/brands/${brand}/!(*.${themes.join(`|*.`)}).json`,
      `config/global/**/!(*.${themes.join(`|*.`)}).json`,
      `config/platforms/${platform}/!(*.${themes.join(`|*.`)}).json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `${outputPath}/web/${brand}/`,
        "files": [{
          "destination": "config.scss",
          "format": "scss/variables"
        }],
        "options": {
          "outputReferences": true
        }
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `${outputPath}/android/${brand}/`,
        "files": [{
          "destination": "config.colors.xml",
          "format": "android/colors"
        }],
        "options": {
          "outputReferences": true
        }
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `${outputPath}/ios/${brand}/`,
        "files": [{
          "destination": "config.h",
          "format": "ios/macros"
        }],
        "options": {
          "outputReferences": true
        }
      }
    }
  };
}

function darkThemeConfig(brand, platform) {
  return {
    "include": [
      `config/brands/${brand}/!(*.${themes.join(`|*.`)}).json`,
      `config/global/**/!(*.${themes.join(`|*.`)}).json`,
      `config/platforms/${platform}/!(*.${themes.join(`|*.`)}).json`
    ],
    "source": [
      `config/brands/${brand}/*.dark.json`,
      "config/global/**/*.dark.json",
      `config/platforms/${platform}/*.dark.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `${outputPath}/web/${brand}/`,
        "files": [{
          "destination": "config.dark.scss",
          "format": "scss/variables"
        }],
        "options": {
          "outputReferences": true
        }
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `${outputPath}/android/${brand}/`,
        "files": [{
          "destination": "config.colors.dark.xml",
          "format": "android/colors"
        }],
        "options": {
          "outputReferences": true
        }
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `${outputPath}/ios/${brand}/`,
        "files": [{
          "destination": "config.dark.h",
          "format": "ios/macros"
        }],
        "options": {
          "outputReferences": true
        }
      }
    }
  };
}

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨

(async () => {

  try {
    console.log(`\nCleaning up the ${outputPath} folder..`);

    await del(outputPath);

    console.log(`\n✨ All clean ✨\n`);
  } catch (err) {
    console.error(`Error while deleting ${outputPath} folder`);
  }
  console.log('🔨 Build started... 🔨');

  // LIGHT THEME

  console.log(`\n☀️ Building light mode...`);

  brands.map(function (brand) {
    console.log('\n==============================================');
    console.log(`\n${brand.toUpperCase()}`);

    platforms.map(function (platform) {
      const StyleDictionary = StyleDictionaryPackage.extend(lightThemeConfig(brand, platform));

      StyleDictionary.buildPlatform(platform);
    })
  })
  console.log('\n==============================================');
  console.log('\nBuild completed!\n');

  // DARK THEME

  console.log(`\n\n🌙 Building dark mode...`);

  brands.map(function (brand) {
    console.log('\n==============================================');
    console.log(`\n${brand.toUpperCase()}`);

    platforms.map(function (platform) {
      const StyleDictionary = StyleDictionaryPackage.extend(darkThemeConfig(brand, platform));

      StyleDictionary.buildPlatform(platform);
    })
  })
  console.log('\n==============================================');
  console.log('\nBuild completed!\n');

})();
