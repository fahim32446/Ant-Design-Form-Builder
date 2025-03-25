import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComponentType, IFormState } from '../../../type/FormType.interface';

interface FormState {
  formItems: IFormState[];
  activeId?: string;
}

const initialState: FormState = {
  formItems: [],
  activeId: undefined,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<IComponentType>) => {
      const newItem: IFormState = {
        id: `${action.payload}-${Date.now()}`,
        type: action.payload,
        col: 12,
        label: 'Field',
      };
      state.formItems.push(newItem);
      state.activeId = newItem.id;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.formItems = state.formItems.filter((item) => item.id !== action.payload);
      if (state.activeId === action.payload) {
        state.activeId = undefined;
      }
    },
    setActiveId: (state, action: PayloadAction<string | undefined>) => {
      state.activeId = action.payload;
    },
    setReorder: (
      state,
      action: PayloadAction<{ activeId?: UniqueIdentifier; overId?: UniqueIdentifier }>
    ) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.formItems.findIndex((item) => item.id === activeId);
      const newIndex = state.formItems.findIndex((item) => item.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        state.formItems = arrayMove(state.formItems, oldIndex, newIndex);
      }
    },
    setFormItemsChange: (state, action: PayloadAction<IFormState>) => {
      const activeId = state.activeId;
      const exists = state.formItems.some((option) => option.id === activeId);

      if (exists) {
        state.formItems = state.formItems.map((option) =>
          option.id === activeId ? { ...option, ...action.payload } : option
        );
      }
    },
  },
});

export const { addComponent, removeComponent, setActiveId, setReorder, setFormItemsChange } =
  formSlice.actions;
export default formSlice.reducer;
