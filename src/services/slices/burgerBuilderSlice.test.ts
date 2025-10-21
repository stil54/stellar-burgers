import burgerBuilderReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal
} from './burgerBuilderSlice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: 'test-id',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockBun: TIngredient = {
  ...mockIngredient,
  _id: 'bun-id',
  name: 'Test Bun',
  type: 'bun'
};

describe('burgerBuilder reducer', () => {
  it('should handle addIngredient for bun', () => {
    const action = addIngredient(mockBun);
    const state = burgerBuilderReducer(initialState, action);

    expect(state.bun).toEqual({ ...mockBun, id: expect.any(String) });
  });

  it('should handle addIngredient for main ingredient', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerBuilderReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  it('should handle removeIngredient', () => {
    const addAction = addIngredient(mockIngredient);
    let state = burgerBuilderReducer(initialState, addAction);

    const removeAction = removeIngredient(state.ingredients[0].id);
    state = burgerBuilderReducer(state, removeAction);

    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const ingredient1 = { ...mockIngredient, _id: '1' };
    const ingredient2 = { ...mockIngredient, _id: '2' };
    const ingredient3 = { ...mockIngredient, _id: '3' };

    const addAction1 = addIngredient(ingredient1);
    let state = burgerBuilderReducer(initialState, addAction1);

    const addAction2 = addIngredient(ingredient2);
    state = burgerBuilderReducer(state, addAction2);

    const addAction3 = addIngredient(ingredient3);
    state = burgerBuilderReducer(state, addAction3);

    const moveAction = moveIngredient({ dragIndex: 0, hoverIndex: 2 });
    state = burgerBuilderReducer(state, moveAction);

    expect(state.ingredients[0]._id).toBe('2');
    expect(state.ingredients[1]._id).toBe('3');
    expect(state.ingredients[2]._id).toBe('1');
  });

  it('should handle clearConstructor', () => {
    const addBunAction = addIngredient(mockBun);
    let state = burgerBuilderReducer(initialState, addBunAction);

    const addIngAction = addIngredient(mockIngredient);
    state = burgerBuilderReducer(state, addIngAction);

    const clearAction = clearConstructor();
    state = burgerBuilderReducer(state, clearAction);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle closeOrderModal', () => {
    const stateWithModal = {
      ...initialState,
      orderModalData: { number: 12345 } as any,
      orderRequest: true
    };

    const action = closeOrderModal();
    const state = burgerBuilderReducer(stateWithModal, action);

    expect(state.orderModalData).toBeNull();
    expect(state.orderRequest).toBe(false);
  });
});
