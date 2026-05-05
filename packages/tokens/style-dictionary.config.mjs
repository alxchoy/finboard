import StyleDictionary from 'style-dictionary';

const styleDictionary = new StyleDictionary({
  log: {
    verbosity: 'verbose'
  },
  source: [
    "tokens/primitive/**/*.json",
    "tokens/semantic/**/*.json",
    "tokens/component/**/*.json"
  ],
  platforms: {
    css_primitive: {
      transformGroup: "css",
      prefix: "fin",
      buildPath: "dist/css/",
      files: [
        {
          destination: 'primitive.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('primitive'),
          options: {
            outputReferences: true
          }
        }
      ]
    },
    css_semantic: {
      transformGroup: "css",
      prefix: 'fin',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'semantic.css',
          format: 'css/variables-merge',
          filter: (token) => token.filePath.includes('semantic')
        }
      ]
    },
    css_component: {
      transformGroup: "css",
      prefix: "fin",
      buildPath: "dist/css/",
      files: [
        {
          destination: "component.css",
          format: "css/variables",
          filter: (token) => token.filePath.includes('component'),
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
});

styleDictionary.registerFormat({
  name: 'css/variables-merge',
  format: ({ dictionary, options }) => {
    const formatValue = (value) => {
      return value
        .replace(/^\{|\}$/g, '')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\./g, '-')
        .replace(/_/g, '-')
        .toLowerCase();
    }

    const semanticLight = dictionary.allTokens
      .filter(t => !(t.filePath.includes('dark')))
      .map(
        token => {
          const { name } = token;
          const cssVariableName = `var(--fin-${formatValue(token.original.value)})`;
          return `  --${name}: ${cssVariableName};`;
        }
      )
      .join('\n');

    const semanticDark = dictionary.allTokens
      .filter(t => t.filePath.includes('dark'))
      .map(
        token => {
          const { name } = token;
          const nameProp = name.replace(/-dark-/g, '-')
          const cssVariableName = `var(--fin-${formatValue(token.original.value)})`;
          return `  --${nameProp}: ${cssVariableName};`;
        }
      )
      .join('\n');

    const headerComment = `/**\n* Do not edit directly, this file was auto-generated.\n*/`;

    return `${headerComment}\n\n:root {\n${semanticLight}\n}\n\n[data-theme="dark"] {\n${semanticDark}\n}`;
  }
})

await styleDictionary.buildAllPlatforms()