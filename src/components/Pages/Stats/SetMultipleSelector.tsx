import { Select } from 'antd';
import React from 'react';
import { Game } from 'src/models/game';
import styled from 'styled-components';

const { Option } = Select;

interface SetMultipleSelectorProps {
  game: Game;
  selectedSets: string[];
  onSetsChanged: (selectedSets: string[]) => void;
}

export const SetMultipleSelector: React.FC<SetMultipleSelectorProps> = (
  props: SetMultipleSelectorProps
): JSX.Element => (
  <StyledSetMultipleSelector>
    <Select mode="multiple" onChange={(values): void => props.onSetsChanged(values)} value={props.selectedSets}>
      {props.game.sets.map((set, index) => (
        <Option key={index} value={'Set ' + (index + 1)}>
          Set {index + 1}
        </Option>
      ))}
    </Select>
  </StyledSetMultipleSelector>
);

const StyledSetMultipleSelector = styled.div`
  width: 335px;
`;
