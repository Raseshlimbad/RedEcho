import { type SchemaTypeDefinition } from 'sanity'
import { userType } from './userType'
import { postType } from './postType'
import { subechoType } from './subechoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, subechoType, postType],
}
