import React from 'react';
import ShortcutModal from '../../CommVoiceAdmin/components/modals/ShortcutModal';
import CommonModal from '../../../common/components/modals/CommonModal';

function Modals({
  show,
  onSelect,
  onUpdate,
  nodeSelectedForDelete,
  setNodeSelectedForDelete,
  handleDeleteComponent,
  handleRemoveConnections,
}) {
  return (
    <>
      <ShortcutModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'Shortcut' || show?.type === 'shortcut')
        }
        onSelect={(data) => {
          onSelect(data);
        }}
        onUpdate={onUpdate}
      />

      <CommonModal
        isVisible={
          nodeSelectedForDelete?.isVisible &&
          nodeSelectedForDelete?.type === 'remove-connection'
        }
        title="Remove Connection"
        actionType="Remove "
        text=" the Connection."
        label="To confirm this action please type “Remove”"
        btnLabel="Remove"
        onClose={() => {
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        }}
        actionKey="Remove"
        handleAction={() => {
          handleRemoveConnections();
        }}
      />

      <CommonModal
        isVisible={
          nodeSelectedForDelete?.isVisible &&
          nodeSelectedForDelete?.type === 'delete-node'
        }
        title="Delete Component"
        actionType="Delete "
        text=" the Component."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
        }}
        actionKey="Delete"
        isProcessing={false}
        handleAction={() => {
          handleDeleteComponent();
        }}
      />
    </>
  );
}

export default Modals;
