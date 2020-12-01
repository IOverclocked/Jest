describe('Matchers', (): void => {
	it('toEqual', (): void => {
		const data = { one: 1 }
		data['two'] = 2

		expect(data).toEqual({ one: 1, two: 2 })
	})

	it('payload toEqual', async (): Promise<void> => {
		const payload = await Promise.resolve({
			data: {
				entity: {
					id: 0,
					version: 0,
					name: 'name',
				},
			},
		})

		expect(payload).toEqual({
			data: {
				entity: {
					id: 0,
					version: 0,
					name: 'name',
				},
			},
		})
	})

	it('payload count to be greater then on init count', async (): Promise<void> => {
		let payload = {
			data: {
				entities: [],
			},
		}

		const initCount: number = payload.data.entities.length

		payload = await Promise.resolve({
			data: {
				entities: [
					{
						id: 0,
						version: 0,
						name: 'name',
					},
					{
						id: 0,
						version: 0,
						name: 'name',
					},
				],
			},
		})

		const currentCount: number = payload.data.entities.length

		expect(currentCount).toBeGreaterThan(initCount)
	})

	it('Throw new error if given duplicated name', async (): Promise<void> => {
		const names = ['Sam', 'John', 'Chuck']

		const duplicated = (name: string): void => {
			const isDuplicated: boolean = names.some(
				(value: string): boolean => value === name,
			)
			if (isDuplicated) {
				throw new Error('Some error')
			}
		}

		expect(() => duplicated('John')).toThrow()
	})
})
