import {
  Button,
  Notification,
  Stack,
  SystemIcon,
  Tabs,
  useModal,
} from '@kadena/react-ui';

import {
  loadingWrapperClass,
  scrollBoxClass,
  scrollBoxEnabledClass,
} from './../styles.css';
import { ResultCount } from './ResultCount';
import { StaticResults } from './StaticResults';

import { Loading } from '@/components';
import { IConversation } from '@/hooks/useSearch/useConversation';
import { createLinkFromMD } from '@/utils';
import classnames from 'classnames';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface IProps {
  semanticResults: ISearchResult[];
  semanticError?: string;
  semanticIsLoading: boolean;
  outputStream: string;
  conversation: IConversation;
  limitResults?: number;
  query?: string;
  error?: string;
  isLoading: boolean;
  hasScroll?: boolean;
  onTabSelect: (tabName: string) => void;
}

const TABNAME = 'searchTabSelected';

export const SearchResults: FC<IProps> = ({
  semanticResults,
  semanticError,
  semanticIsLoading,
  conversation,
  outputStream,
  limitResults,
  query,
  error,
  isLoading,
  hasScroll = false,
  onTabSelect,
}) => {
  const { clearModal } = useModal();
  const [selectedTabName, setSelectedTabName] = useState<string>('docs');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const scrollBoxClasses = classnames(scrollBoxClass, {
    [scrollBoxEnabledClass]: hasScroll,
  });

  const rememberTab = (e: React.MouseEvent<HTMLElement>): void => {
    const buttonName = (e.target as HTMLElement).getAttribute('data-value');
    if (buttonName === null) return;
    localStorage.setItem(TABNAME, buttonName);
    onTabSelect(buttonName);
  };

  useEffect(() => {
    const value = localStorage.getItem(TABNAME);
    setIsMounted(true);
    if (value === null) return;

    setSelectedTabName(value);
    onTabSelect(value);
  }, [setSelectedTabName, setIsMounted, onTabSelect]);

  if (!isMounted) return null;
  return (
    <section onClick={rememberTab}>
      <Tabs.Root defaultSelected={selectedTabName}>
        <Tabs.Tab value="docs">Docs Space </Tabs.Tab>
        <Tabs.Tab value="qa">QA Space</Tabs.Tab>

        <Tabs.Content value="docs">
          <div className={scrollBoxClasses}>
            {semanticIsLoading && (
              <div className={loadingWrapperClass}>
                <Loading />
              </div>
            )}
            {semanticError ? (
              <Notification.Root
                color={'negative'}
                expanded={true}
                icon={SystemIcon.AlertBox}
              >
                {semanticError}
              </Notification.Root>
            ) : (
              <>
                <ResultCount count={semanticResults.length} />
                <StaticResults
                  limitResults={limitResults}
                  results={semanticResults}
                />
                {limitResults !== undefined && query !== undefined ? (
                  <Stack justifyContent="flex-end">
                    <Link href={`/search?q=${query}`} passHref legacyBehavior>
                      <Button
                        icon={'TrailingIcon'}
                        iconAlign="right"
                        title="Go to search results"
                        onClick={clearModal}
                      >
                        Go to search results
                      </Button>
                    </Link>
                  </Stack>
                ) : null}
              </>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="qa">
          <div className={scrollBoxClasses}>
            {isLoading && (
              <div className={loadingWrapperClass}>
                <Loading />
              </div>
            )}
            {error && (
              <Notification.Root
                color={'negative'}
                expanded={true}
                icon={SystemIcon.AlertBox}
              >
                {error}
              </Notification.Root>
            )}

            {conversation?.history.map((interaction, idx) => (
              <div key={`${interaction.input}-${idx}`}>
                <ReactMarkdown>{interaction?.output}</ReactMarkdown>
                <div>
                  {interaction?.metadata?.map((item, innerIdx) => {
                    const url = createLinkFromMD(item.title);
                    return (
                      <>
                        <Link key={`${url}-${innerIdx}`} href={url}>
                          {url}
                        </Link>
                      </>
                    );
                  })}
                </div>
              </div>
            ))}

            <div>{outputStream}</div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};
