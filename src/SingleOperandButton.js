import {ACTIONS} from './App'

export default function SingleOperandButton({dispatch, operation}) {
    return <button onClick={() => dispatch(
        { 
            type: ACTIONS.OPERATE, 
            payload: { operation }
        })}>{operation}</button>
}