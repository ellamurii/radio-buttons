import React, { ReactElement } from 'react';
import { MenuItem } from '../types/menuRules';

interface Props {
  items: MenuItem[];
  grpIndex: number;
  selection: Dictionary<string>;
  incompatible: number[];
  isDisabled?: boolean;
  onChangeSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuRadioGroup = (props: Props) => {
  const isNotCompatible = React.useCallback(
    (id: string) => {
      return props.incompatible.includes(parseInt(id, 10));
    },
    [props.incompatible]
  );

  const renderRadioButton = (item: MenuItem): ReactElement => {
    const isDisabled = isNotCompatible(item.id) || props.isDisabled;
    return (
      <label className={`radio-label ${isDisabled ? 'disabled' : ''}`}>
        <input
          type="radio"
          id={`menu-${item.id}`}
          name={`menu-${props.grpIndex}`}
          value={item.id}
          disabled={isDisabled}
          checked={item.id === props.selection[`${props.grpIndex}`]}
          onChange={props.onChangeSelection}
        />
        <span className="inner-label">{item.value}</span>
      </label>
    );
  };

  return (
    <ul className="radio-group">
      {props.items.map((item: MenuItem) => (
        <li className="radio-item" key={`radio-item-${item.id}`}>
          {renderRadioButton(item)}
        </li>
      ))}
    </ul>
  );
};

export default MenuRadioGroup;
