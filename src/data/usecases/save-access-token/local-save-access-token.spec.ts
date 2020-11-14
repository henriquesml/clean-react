import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test'

describe('LocalSaveAccessToken', () => {
  test('deve chama o setStorage correto', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
  })

  test('deve chamar o setStorage com o valor correto', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
