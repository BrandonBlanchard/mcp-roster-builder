import React, { useState } from 'react';
import {
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItem,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { McpDataType } from '../../../../service-models/card-models';
import { McpList } from '../../../list';

interface RosterBuilderSectionProps {
  title: string;
  cardIds: string[];
  cardType: McpDataType;
  selectedIds: Record<string, any>;
  maxCount: number;
  onSelectItem?: () => void;
  addRemoveIdFromList: (id: string, cardType: McpDataType) => void;
}

export const RosterBuilderSection: React.FC<RosterBuilderSectionProps> = ({
  title,
  cardIds,
  cardType,
  selectedIds,
  maxCount,
  addRemoveIdFromList,
  onSelectItem = () => null,
}) => {
  const [rosterSectionExpanded, setRosterSectionExpanded] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'stretch',
      }}
    >
      <ListItemButton
        onClick={() => setRosterSectionExpanded(!rosterSectionExpanded)}
      >
        <ListItemText
          primary={(
            <Typography variant="overline" textAlign="left">
              {title}
              {' '}
              {cardIds.length}
              {' '}
              /
              {' '}
              {maxCount}
            </Typography>
          )}
        />
        {rosterSectionExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      {rosterSectionExpanded && cardIds.length > 0 && (
        <McpList
          cards={cardIds}
          cardType={cardType}
          selectCallback={onSelectItem}
          addRemoveCallback={addRemoveIdFromList}
          selectedItemsHash={selectedIds}
        />
      )}
      {rosterSectionExpanded && cardIds.length === 0 && (
        <ListItem>
          <Typography variant="body1" textAlign="left">
            {' '}
            empty
            {' '}
          </Typography>
        </ListItem>
      )}
    </div>
  );
};
