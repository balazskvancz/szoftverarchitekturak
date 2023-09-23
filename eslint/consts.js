const globals = require('globals')

const FORBIDDEN_OPERATORS = [ '===', '>=', '<=', '<', '>' ]

/**
 * Kitiltások a 'no-restricted-syntax' szabályhoz.
 * @type {TReadonlyRecord<string, TReadonlyRecord<'selector'|'message', string>>}
 */
const NO_RESTRICTED_SYNTAX_SELECTORS = {
  ...FORBIDDEN_OPERATORS.reduce((/** @type {Record<string, TReadonlyRecord<'selector'|'message', string>>} */acc, operator, index) => {
    const key = `noRestrictedBooleanOperator${ index }`

    const selector = [
      'BinaryExpression',
      `[operator="${ operator }"]`,
      '[left.object.type="Identifier"]',
      '[left.property.name="length"]',
      '[right.value="0"]'
    ].join('')

    const message = operator.includes('>')
      ? 'Használd a !is.empty() függvényt / Validator megfelelő függvényét!'
      : 'Használd az is.empty() függvényt / Validator megfelelő függvényét!'

    acc[key] = {
      selector,
      message
    }

    return acc
  }, {}),
  with: {
    selector: 'WithStatement',
    message: 'Nem használhatsz "with" statementet!'
  },
  while: {
    selector: 'WhileStatement',
    message: 'Nem használhatsz "while" statementet!'
  },
  for: {
    selector: 'ForStatement',
    message: 'Nem használhatsz "for" statementet!'
  },
  forIn: {
    selector: 'ForInStatement',
    message: 'Nem használhatsz "for-in" statementet!'
  },
  forOf: {
    selector: 'ForOfStatement',
    message: 'Nem használhatsz "for-of" statementet!'
  },
  binaryExpressionInOperator: {
    selector: 'BinaryExpression[operator=in]',
    message: 'Nem használhatsz "in" operátort!'
  },
  typeof: {
    selector: 'UnaryExpression[operator="typeof"]',
    message: 'A typeof helyett használd a "is" függvényeit!'
  },
  instanceof: {
    selector: 'BinaryExpression[operator="instanceof"]',
    message: 'Az instanceof helyett használd a Validator függvényeit!'
  },
  isArray: {
    selector: 'CallExpression[callee.object.name="Array"][callee.property.name="isArray"]',
    message: 'Az Array.isArray helyett használd backendnél a Validator.isArray-t, frontendnél pedig az is.array-t!'
  },
  switch: {
    selector: 'SwitchStatement',
    message: 'A "switch" helyett írj if-et, early return-el, vagy szervezd objectbe!'
  },
  classMethodStaticArrowDeclaration: {
    selector: 'ClassDeclaration > ClassBody > PropertyDefinition[static=true][value.type="ArrowFunctionExpression"]',
    message: 'Statikus függvény esetén teljesen indokolatlan az arrow function.'
  },
  classMethodImplicitReturn: {
    selector: 'ClassDeclaration > ClassBody > PropertyDefinition[value.type="ArrowFunctionExpression"][value.expression=true]',
    message: 'Nehezen olvasható implicit return, írd át explicitre!'
  },
  classMethodPublicArrowDeclaration: {
    selector: 'ClassDeclaration > ClassBody > PropertyDefinition[value.type="ArrowFunctionExpression"][accessibility=public]',
    message: 'Semmi értelme a publikus arrow function-nak, írd át sima függvényre!'
  },
  variableArrowDeclaration: {
    selector: 'VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
    message: 'Használj hagyományos function-t!'
  },
  noUnnamedTuple: {
    selector: 'TSTupleType > :not(TSNamedTupleMember).elementTypes',
    message: 'Nevezd el a tuple-ben lévő típusokat!'
  },
  noBinaryExpressionNull: {
    selector: 'BinaryExpression[right.raw=null]',
    message: 'Ne validálj null-ra! Használj validálókönyvtárat!'
  },
  noBinaryExpressionUndefined: {
    selector: 'BinaryExpression[right.type="Identifier"][right.name="undefined"]',
    message: 'Ne validálj undefined-ra! Használj validálókönyvtárat!'
  },
  functionDeclarationThisVoid: {
    selector: 'FunctionDeclaration[params.0.name="this"]',
    message: 'Sima függvényben nem használhatsz `this: void` paramétert!'
  },
  classPropertyDefinite: {
    selector: 'ClassDeclaration PropertyDefinition[definite="true"]',
    message: 'Nem használhatsz `bang` operátort!'
  },
  publicGetHTMLElement: {
    selector: [
      'ClassDeclaration',
      ' ',
      'MethodDefinition',
      '[accessibility="public"]',
      '[value.returnType.typeAnnotation.typeName.name="HTMLElement"]'
    ].join(''),
    message: 'Nem adhatsz vissza publikusan HTMLElement-et!'
  },
  publicGetHTMLElementList: {
    selector: [
      'ClassDeclaration',
      ' ',
      'MethodDefinition',
      '[accessibility="public"]',
      '[value.returnType.typeAnnotation.elementType.typeName.name="HTMLElement"]'
    ].join(''),
    message: 'Nem adhatsz vissza publikusan HTMLElement-et!'
  },
  testAndDescribeSkipTodoOnly: {
    selector: 'ExpressionStatement Identifier[name="todo"], Identifier[name="skip"], Identifier[name="only"]',
    message: 'Nem használhatsz `todo`, `skip` és `only` függvényeket!, '
  },
  expectToHaveBeenCalledTimesZero: {
    selector: 'ExpressionStatement CallExpression[arguments.0.raw="0"][callee.property.name="toHaveBeenCalledTimes"]',
    message: 'A toHaveBeenCalledTimes(0) helyett a not.toHaveBeenCalled() matchert használd!'
  },
  noQuerySelectorAllFind: {
    selector: [
      'CallExpression > ',
      'MemberExpression',
      '[object.callee.object.name="Array"]',
      '[object.callee.property.name="from"]',
      '[object.arguments.0.callee.property.name="querySelectorAll"]',
      '[property.name="find"]'
    ].join(''),
    message: 'Használj sima querySelectort!'
  },
  logicalUnaryAndObjectExpression: {
    selector: 'LogicalExpression:not([operator="??"])[left.type="UnaryExpression"][right.type="ObjectExpression"]',
    message: 'Nehezen értelmezhető kifejezés, használj helyette ternary-t!'
  },
  logicalBinaryAndObjectExpression: {
    selector: 'LogicalExpression:not([operator="??"])[left.type="BinaryExpression"][right.type="ObjectExpression"]',
    message: 'Nehezen értelmezhető kifejezés, használj helyette ternary-t!'
  },
  logicalMemberAndObjectExpression: {
    selector: 'LogicalExpression:not([operator="??"])[left.type="MemberExpression"][right.type="ObjectExpression"]',
    message: 'Nehezen értelmezhető kifejezés, használj helyette ternary-t!'
  },
  logicalLogicalAndObjectExpression: {
    selector: 'LogicalExpression:not([operator="??"])[left.type="LogicalExpression"][right.type="ObjectExpression"]',
    message: 'Nehezen értelmezhető kifejezés, használj helyette ternary-t!'
  },
  logicalIdentifierAndObjectExpression: {
    selector: 'LogicalExpression:not([operator="??"])[left.type="Identifier"][right.type="ObjectExpression"]',
    message: 'Nehezen értelmezhető kifejezés, használj helyette ternary-t!'
  },
  noThen: {
    selector: [
      'CallExpression > ',
      'MemberExpression',
      '[object.type="CallExpression"]',
      '[property.name="then"]'
    ].join(''),
    message: 'Nem használhatsz .then()-t.'
  },
  noNotLengthPropertyToCheckIsEmpty: {
    selector: [
      'IfStatement > ',
      'UnaryExpression',
      '[operator="!"]',
      '[argument.object.type="Identifier"]',
      '[argument.property.name="length"]'
    ].join(''),
    message: 'Használd az is.empty() függvényt / Validator megfelelő függvényét.'
  },
  noLengthPropertyToCheckIsNotEmpty: {
    selector: [
      'IfStatement > ',
      'MemberExpression',
      '[object.type="Identifier"]',
      '[property.name="length"]'
    ].join(''),
    message: 'Használd az !is.empty() függvényt / Validator megfelelő függvényét.'
  },
  classDeclarationMethodDefinitionFunctionDeclaration: {
    selector: 'ClassDeclaration MethodDefinition FunctionDeclaration',
    message: 'Class metódusban NEM definiálhatsz függvényt! Szervezd ki!'
  },
  //
  // Ezek ES2020 feature-k, nem szeretnénk őket használni.
  // https://www.w3schools.com/js/js_2020.asp
  //
  logicalAndAssignmentOperator: {
    selector: 'ExpressionStatement[expression.operator="&&="]',
    message: 'Tiltott ES2020 syntax!'
  },
  logicalOrAssignmentOperator: {
    selector: 'ExpressionStatement[expression.operator="||="]',
    message: 'Tiltott ES2020 syntax!'
  },
  nullishCoalescingAssignmentOperator: {
    selector: 'ExpressionStatement[expression.operator="??="]',
    message: 'Tiltott ES2020 syntax!'
  },
  bigInt: {
    selector: 'VariableDeclarator[init.bigint]',
    message: 'Tiltott ES2020 syntax!'
  },
  // ES2022
  // https://github.com/AlbertoMontalesi/The-complete-guide-to-modern-JavaScript/blob/master/ebook/24_what_new_es2022.md#at
  //
  callExpressionAtIdentifier: {
    selector: 'CallExpression[callee.type="MemberExpression"][callee.property.name="at"]',
    message: 'Tiltott ES2022 syntax! Használj hagyományos indexelést!'
  }
}

/** @type { readonly { object?: string, property?: string, message: string }[] } */
const NO_RESTRICTED_PROPERTIES = [
  // Scroll kitiltások.
  ...[ 'scroll', 'scrollTo', 'scrollBy', 'scrollIntoView' ].map((property) => {
    return {
      property,
      message: 'Használd a @common/scroll-t!'
    }
  }),

  ...[ 'getElementById', 'getElementsByClassName', 'getElementsByTagName' ].map((property) => {
    return {
      property,
      message: 'Használd a querySelector-t!'
    }
  }),

  {
    property: 'replaceChildren',
    message: 'Használd a utils/replace-t!'
  },

  {
    property: 'prepend',
    message: 'Használd a utils/prepend-et!'
  },

  {
    property: 'insertBefore',
    message: 'Használd a utils/before-t!'
  },

  {
    property: 'apply',
    message: 'Ne használj apply-t!'
  },

  {
    property: 'removeChild',
    message: 'A removeChild helyett használd az elem `remove()` függvényét!'
  },

  {
    property: 'dispatchEvent',
    message: 'Használd a @common/utils/events `dispatch` függvényét!'
  },

  {
    property: 'firstChild',
    message: 'Használj pontos querySelectort!'
  },

  {
    property: 'lastChild',
    message: 'Használj pontos querySelectort!'
  },

  {
    property: 'logic',
    message: 'Használj egységesen `gl` propertyt logic helyett!'
  },

  {
    property: 'replaceAll',
    message: 'Használd a sima replace-t RegExp-el, `g` flaggel!'
  },

  ...[ 'allSettled', 'race', 'any' ].map((property) => {
    return {
      property,
      message: 'Tiltott statikus Promise függvény!'
    }
  })
]

module.exports = {
  NO_RESTRICTED_SYNTAX_SELECTORS,
  NO_RESTRICTED_PROPERTIES,
}
