import compact from '../compact'

describe('given {}', () => {
  it('returns {}', () => {
    expect(compact({})).toEqual({})
  })
})

describe('given { a: "a" }', () => {
  it('returns { a: "a" }', () => {
    expect(compact({ a: 'a' })).toEqual({ a: 'a' })
  })
})

describe('given { a: null }', () => {
  it('returns {}', () => {
    expect(compact({ a: null })).toEqual({})
  })
})

describe('given { a: 0 }', () => {
  it('returns {}', () => {
    expect(compact({ a: 0 })).toEqual({})
  })
})
