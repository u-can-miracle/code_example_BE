/* tslint:disable:max-line-length */

export default {
  alternatives: {
    base: 'not matching any of the allowed alternatives',
    child: null,
  },
  any: {
    allowOnly: 'must be one of {{valids}}',
    default: 'threw an error when running default method',
    empty: '{{label}} field cannot be empty',
    invalid: 'contains an invalid value',
    required: 'is required',
    unknown: 'is not allowed',
  },
  array: {
    base: 'must be an array',
    excludes: 'at position {{pos}} contains an excluded value',
    excludesSingle: 'single value of "{{!label}}" contains an excluded value',
    hasKnown:
      'does not contain at least one required match for type "{{!patternLabel}}"',
    hasUnknown: 'does not contain at least one required match',
    includes: 'at position {{pos}} does not match any of the allowed types',
    includesOne: 'at position {{pos}} fails because {{reason}}',
    includesOneSingle: 'single value of "{{!label}}" fails because {{reason}}',
    includesRequiredBoth:
      'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
    includesRequiredKnowns: 'does not contain {{knownMisses}}',
    includesRequiredUnknowns:
      'does not contain {{unknownMisses}} required value(s)',
    includesSingle:
      'single value of "{{!label}}" does not match any of the allowed types',
    length: 'must contain {{limit}} items',
    max: 'must contain less than or equal to {{limit}} items',
    min: 'must contain at least {{limit}} items',
    ordered: 'at position {{pos}} fails because {{reason}}',
    orderedLength:
      'at position {{pos}} fails because array must contain at most {{limit}} items',
    ref: 'references "{{ref}}" which is not a positive integer',
    sparse: 'must not be a sparse array',
    unique: 'position {{pos}} contains a duplicate value',
  },
  binary: {
    base: 'must be a buffer or a string',
    length: 'must be {{limit}} bytes',
    max: 'must be less than or equal to {{limit}} bytes',
    min: 'must be at least {{limit}} bytes',
  },
  boolean: {
    base: 'must be a boolean',
  },
  date: {
    base: 'must be a number of milliseconds or valid date string',
    greater: 'must be greater than "{{limit}}"',
    isoDate: 'must be a valid ISO 8601 date',
    less: 'must be less than "{{limit}}"',
    max: 'must be less than or equal to "{{limit}}"',
    min: 'must be larger than or equal to "{{limit}}"',
    ref: 'references "{{ref}}" which is not a date',
    strict: 'must be a valid date',
    timestamp: {
      javascript: 'must be a valid timestamp or number of milliseconds',
      unix: 'must be a valid timestamp or number of seconds',
    },
  },
  function: {
    arity: 'must have an arity of {{n}}',
    base: 'must be a Function',
    class: 'must be a class',
    maxArity: 'must have an arity lesser or equal to {{n}}',
    minArity: 'must have an arity greater or equal to {{n}}',
    ref: 'must be a Joi reference',
  },
  key: 'ru: "{{!label}}" ',
  languageName: 'ru',
  lazy: {
    base: '!!schema error: lazy schema must be set',
    schema: '!!schema error: lazy schema function must return a schema',
  },
  messages: {
    wrapArrays: true,
  },
  number: {
    base: 'must be a number',
    greater: 'must be greater than {{limit}}',
    integer: 'must be an integer',
    less: 'must be less than {{limit}}',
    max: 'must be less than or equal to {{limit}}',
    min: 'must be larger than or equal to {{limit}}',
    multiple: 'must be a multiple of {{multiple}}',
    negative: 'must be a negative number',
    port: 'must be a valid port',
    positive: 'must be a positive number',
    precision: 'must have no more than {{limit}} decimal places',
    ref: 'references "{{ref}}" which is not a number',
    unsafe: 'must be a safe number',
  },
  object: {
    allowUnknown: '!!"{{!child}}" is not allowed',
    and:
      'contains {{presentWithLabels}} without its required peers {{missingWithLabels}}',
    assert:
      '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
    base: 'must be an object',
    child: '!!child "{{!child}}" fails because {{reason}}',
    length: 'must have {{limit}} children',
    max: 'must have less than or equal to {{limit}} children',
    min: 'must have at least {{limit}} children',
    missing: 'must contain at least one of {{peersWithLabels}}',
    nand:
      '!!"{{mainWithLabel}}" must not exist simultaneously with {{peersWithLabels}}',
    oxor:
      'contains a conflict between optional exclusive peers {{peersWithLabels}}',
    rename: {
      multiple:
        'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
      override:
        'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists',
      regex: {
        multiple:
          'cannot rename children {{from}} because multiple renames are disabled and another key was already renamed to "{{to}}"',
        override:
          'cannot rename children {{from}} because override is disabled and target "{{to}}" exists',
      },
    },
    schema: 'must be a Joi instance',
    type: 'must be an instance of "{{type}}"',
    with: '!!"{{mainWithLabel}}" missing required peer "{{peerWithLabel}}"',
    without:
      '!!"{{mainWithLabel}}" conflict with forbidden peer "{{peerWithLabel}}"',
    xor: 'contains a conflict between exclusive peers {{peersWithLabels}}',
  },
  root: 'ru: value',
  string: {
    alphanum: 'должен содержать только буквы и цифры',
    base: 'должно быть строкой',
    creditCard: 'must be a credit card',
    dataUri: 'must be a valid dataUri string',
    email: 'must be a valid email',
    guid: 'must be a valid GUID',
    hex: 'must only contain hexadecimal characters',
    hexAlign: 'hex decoded representation must be byte aligned',
    hostname: 'must be a valid hostname',
    ip: 'must be a valid ip address with a {{cidr}} CIDR',
    ipVersion:
      'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR',
    isoDate: 'must be a valid ISO 8601 date',
    length: 'length must be {{limit}} characters long',
    lowercase: 'must only contain lowercase characters',
    max: 'length must be less than or equal to {{limit}} characters long',
    min: 'length must be at least {{limit}} characters long',
    normalize: 'must EN: be unicode normalized in the {{form}} form',
    ref: 'references "{{ref}}" which is not a number',
    regex: {
      base:
        'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
      base64: 'must be a valid base64 string',
      invert: {
        base:
          'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
        name: 'with value "{{!value}}" matches the inverted {{name}} pattern',
      },
      name: 'with value "{{!value}}" fails to match the {{name}} pattern',
    },
    token: 'must only contain alpha-numeric and underscore characters',
    trim: 'must not have leading or trailing whitespace',
    uppercase: 'must only contain uppercase characters',
    uri: 'must be a valid uri',
    uriCustomScheme:
      'must be a valid uri with a scheme matching the {{scheme}} pattern',
    uriRelativeOnly: 'must be a valid relative uri',
  },
  symbol: {
    base: 'must be a symbol',
    map: 'must be one of {{map}}',
  },
}
