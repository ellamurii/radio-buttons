import React, { useEffect, useState } from 'react';
import MenuRadioGroup from '../components/MenuRadioGroup';
import { getMenuRules } from '../services/menuRulesApi';
import { MenuRules } from '../types/menuRules';
import './styles.scss';

const App = () => {
  const [menuRules, setMenuRules] = useState({} as MenuRules);
  const [selection, setSelection] = useState({} as { [key: string]: string });
  const [incompatible, setIncompatible] = useState([] as number[]);

  useEffect(() => {
    async function fetchMenuRules() {
      const result: MenuRules = await getMenuRules();
      setMenuRules(result);
    }
    fetchMenuRules();
  }, []);

  const generateIncompatible = (selection: { [key: string]: string }) => {
    const selectedIds = Object.values(selection);
    return selectedIds.reduce(
      (a, b) => [...a, ...(menuRules.rules[b] || [])],
      [] as number[]
    );
  };

  const removeInvalidSelection = (updatedSelection: {
    [key: string]: string;
  }) => {
    const selectedIds = Object.entries(updatedSelection);
    const incompatible = generateIncompatible(updatedSelection);
    const validSelection: { [key: string]: string } = {};
    selectedIds.forEach((entry) => {
      const [grpIndex, value] = entry;
      validSelection[grpIndex] = incompatible.includes(parseInt(value, 10))
        ? ''
        : value;
    });
    return validSelection;
  };

  const handleChangeSelection = (
    grpIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSelection = removeInvalidSelection({
      ...selection,
      [grpIndex]: e.target.value,
    });
    setSelection(updatedSelection);
    setIncompatible(generateIncompatible(updatedSelection));
  };

  const isGroupDisabled = (currentGrpIndex: number) => {
    return currentGrpIndex !== 0 && !selection[currentGrpIndex - 1];
  };

  return (
    <>
      <header className="app-header">What are you craving?</header>
      {menuRules && (
        <main className="menu-grp">
          {menuRules.menus?.map((menu, index) => (
            <MenuRadioGroup
              key={`grp-${index}`}
              isDisabled={isGroupDisabled(index)}
              items={menu}
              grpIndex={index}
              selection={selection}
              incompatible={incompatible}
              onChangeSelection={(e) => handleChangeSelection(index, e)}
            />
          ))}
        </main>
      )}
    </>
  );
};

export default App;
