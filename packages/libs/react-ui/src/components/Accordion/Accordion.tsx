'use client';

import { IAccordionSectionProps } from '.';

import type { FC, FunctionComponentElement } from 'react';
import React, { useEffect, useState } from 'react';

export interface IAccordionRootProps {
  children?: FunctionComponentElement<IAccordionSectionProps>[];
  linked?: boolean;
  initialOpenSection?: number;
}

export const AccordionRoot: FC<IAccordionRootProps> = ({
  children,
  linked = false,
  initialOpenSection = undefined,
}) => {
  const [openSections, setOpenSections] = useState([initialOpenSection]);

  useEffect(() => {
    if (linked && openSections.length > 1) {
      const lastOpen = openSections.pop() || undefined;
      setOpenSections([lastOpen]);
    }
  }, [linked]);

  return (
    <div data-testid="kda-accordion-sections">
      {React.Children.map(children, (section, sectionIndex) =>
        React.cloneElement(
          section as React.ReactElement<
            IAccordionSectionProps,
            React.JSXElementConstructor<IAccordionSectionProps>
          >,
          {
            index: sectionIndex,
            isOpen: openSections.includes(sectionIndex),
            onClick: () =>
              openSections.includes(sectionIndex)
                ? setOpenSections(
                    openSections.filter((i) => i !== sectionIndex),
                  )
                : setOpenSections(
                    linked ? [sectionIndex] : [...openSections, sectionIndex],
                  ),
          },
        ),
      )}
    </div>
  );
};
