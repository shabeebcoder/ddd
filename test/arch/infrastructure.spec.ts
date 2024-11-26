import 'tsarch/dist/jest';

import { filesOfProject } from 'tsarch';
describe('infrastructure boundaries', () => {
  jest.setTimeout(60000);
  it('allows multiple patterns for infrastructure', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/infrastructure')
      .should()
      .matchPattern('(orm-entities|.mapper.ts|repository.ts)')
      .check();

    expect(violations).toEqual([]);
  });
  it('allows multiple patterns for orm-entities', async () => {
    const violations = await filesOfProject()
      .inFolder('*/*/infrastructure/orm-entities')
      .should()
      .matchPattern('.orm-entity.ts')
      .check();

    expect(violations).toEqual([]);
  });

  it('infrastructure should not depend on the controller', async () => {
    const rule = filesOfProject()
      .inFolder('*/*')
      .inFolder('*/*/infrastructure/*')
      .shouldNot()
      .dependOnFiles()
      .matchingPattern('.controller.ts');

    await expect(rule).toPassAsync();
  });

  it('infrastructure should not depend on the dtos', async () => {
    const rule = filesOfProject()
      .inFolder('*/*/infrastructure/*')
      .shouldNot()
      .dependOnFiles()
      .inFolder('*/dtos/*');

    await expect(rule).toPassAsync();
  });
});
