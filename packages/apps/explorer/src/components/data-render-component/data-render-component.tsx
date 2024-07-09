import React from 'react';
import DataRenderComponentHorizontal from './data-render-component-horizontal/data-render-component-horizontal';
import DataRenderComponentVertical from './data-render-component-vertical/data-render-component-vertical';
import { headingClass, sectionClass } from './styles.css';

interface IDataRenderComponentField {
  type?: 'text' | 'code';
  canCopy?: boolean;
  key: string;
  value: string | string[] | JSX.Element | JSX.Element[];
  link?: string;
}

interface IDataRenderComponentProps {
  title?: string;
  type?: 'vertical' | 'horizontal';
  fields: IDataRenderComponentField[];
  isLoading?: boolean;
}

const DataRenderComponent: React.FC<IDataRenderComponentProps> = ({
  title,
  type,
  fields,
  isLoading = false,
}) => {
  return (
    <section className={sectionClass}>
      {title && <h4 className={headingClass}>{title}</h4>}
      {(!type || type === 'vertical') && (
        <DataRenderComponentVertical
          isLoading={isLoading}
          fields={fields}
          title={!!title}
        />
      )}
      {type === 'horizontal' && (
        <DataRenderComponentHorizontal isLoading={isLoading} fields={fields} />
      )}
    </section>
  );
};

export default DataRenderComponent;
