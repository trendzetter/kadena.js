import { gql } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import { CORE_EVENTS_FIELDS } from '../fragments/events.graph';

export const coreEvents: DocumentNode = gql`
  ${CORE_EVENTS_FIELDS}

  query events($qualifiedName: String!, $minHeight: Int, $maxHeight: Int) {
    events(
      qualifiedEventName: $qualifiedName
      minHeight: $minHeight
      maxHeight: $maxHeight
    ) {
      edges {
        node {
          ...CoreEventsFields
        }
      }
    }
  }
`;
