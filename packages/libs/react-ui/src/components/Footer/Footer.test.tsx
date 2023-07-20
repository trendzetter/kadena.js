import { SystemIcon } from './../../';

import { Footer } from '@components/Footer';
import { render } from '@testing-library/react';
import React from 'react';

describe('Footer', () => {
  test('renders correctly', () => {
    const menuLinks = [
      {
        title: 'Tutorial',
        href: 'https://kadena.io/',
      },
      {
        title: 'Documentation',
        href: 'https://kadena.io/',
      },
    ];

    const icons = [
      {
        icon: SystemIcon.Earth,
        text: 'English',
      },
      {
        icon: SystemIcon.Account,
      },
    ];

    const { getByTestId, getAllByTestId } = render(
      <Footer.Root>
        <Footer.Panel>
          {menuLinks.map((item, index) => {
            return (
              <Footer.LinkItem key={index} variant="web">
                <a href={item.href}>{item.title}</a>
              </Footer.LinkItem>
            );
          })}
        </Footer.Panel>
        <Footer.Panel>
          {icons.map((item, index) => {
            return (
              <Footer.IconItem
                variant="web"
                key={index}
                icon={item.icon}
                text={item.text}
              />
            );
          })}
        </Footer.Panel>
      </Footer.Root>,
    );

    const footerContainer = getByTestId('kda-footer');
    const footerPanels = getAllByTestId('kda-footer-panel');
    const menuLinksItems = getAllByTestId('kda-footer-link-item');
    const iconItems = getAllByTestId('kda-footer-icon-item');
    expect(footerContainer).toBeInTheDocument();
    expect(footerPanels).toHaveLength(2);
    expect(menuLinksItems).toHaveLength(2);
    expect(iconItems).toHaveLength(2);
    expect(menuLinksItems[0]).toHaveTextContent('Tutorial');
    expect(iconItems[0]).toHaveTextContent('English');
  });
});
