import { type SchemaTypeDefinition } from 'sanity'
import { userType } from './userType'
import { postType } from './postType'
import { subechoType } from './subechoType'
import { commentType } from './commentType'
import { voteType } from './voteType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, subechoType, postType, commentType, voteType],
}
