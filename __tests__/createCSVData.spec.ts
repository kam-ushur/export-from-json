import { testTableItems, testTableItems2, testTableItems3, beforeTableEncode } from './shared/data'
import { createCSVData } from '../src/converters'

test('createCSVData works correctly', () => {
  expect(createCSVData(testTableItems)).toMatchSnapshot()
  expect(createCSVData(testTableItems2)).toMatchSnapshot()
})

test('createCSVData works correctly with specifying beforeTableEncode option', () => {
  expect(createCSVData(testTableItems, { beforeTableEncode })).toMatchSnapshot()
})
test('createCSVData works correctly with delimiter option', () => {
  expect(createCSVData(testTableItems, { delimiter: ';' })).toMatchSnapshot()
})

test('createCSVData works correctly with specifying sanitizeCell option', () => {
  function sanitizeCell(value: string, delimiter: ',' | ';') {
    const enclosingTester = new RegExp(`${delimiter}|"|\n`)
    // Check if the field requires wrapping
    const requiresWrapping = enclosingTester.test(value) || /^[=+\-@]/.test(value);
  
    if (requiresWrapping) {
      // Escape double quotes by replacing each " with ""
      const escaped = value.replace(/"/g, '""');
      // Finally wrap in double quotes
      return `"${escaped}"`;
    }
  
    return value;
  }
  expect(createCSVData(testTableItems3, { sanitizeCell })).toMatchSnapshot()
})


test('createCSVData works with empty array', () => {
  expect(createCSVData([])).toEqual('')
})
