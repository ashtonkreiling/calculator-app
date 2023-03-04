import { useReducer } from "react"
import './App.css';
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import SingleOperandButton from "./SingleOperandButton"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  OPERATE: 'operate',
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand == null) return {
        ...state,
        currentOperand: '0.'
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
        if (state.currentOperand == null){
          return {
            ...state,
            operation: payload.operation
          }
        }
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }
  
          return {
            ...state,
            previousOperand: evaluate(state),
            operation: payload.operation,
            currentOperand: null
          }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1){
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      } else {
        return {
          ...state,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }
      }
    case ACTIONS.OPERATE:
      if (state.currentOperand == null) return state
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: operate({currentOperand: state.currentOperand, payloadOperation: payload.operation})
      }
    }
    

  }

function factorial(num) {
  if (num === 0) {
    return 1;
  }
  if (num < 0) {
    return undefined;
  }
  let to_return = 1
  for (let i=num+1; --i; i>0) {
    to_return *= i;
    console.log(to_return);
  }
  return to_return
}

function operate({currentOperand, payloadOperation}) {
  const current = parseFloat(currentOperand)
  if (isNaN(current)) return ""
  let computation = ""
  switch (payloadOperation) {
    case "sin":
      computation = Math.sin(current)
      break
    case "cos":
      computation = Math.cos(current)
      break
    case "tan":
      computation = Math.tan(current)
      break
    case "sinh":
      computation = Math.sinh(current)
      break
    case "cosh":
      computation = Math.cosh(current)
      break
    case "tanh":
      computation = Math.tanh(current)
      break
    case "X!":
      computation = factorial(current)
      break
    case "1/X":
      computation = 1 / current
      break
    case "2^X":
      computation = 2 ** current
      break
    case "log2":
      computation = Math.log2(current)
      break
    case "sqrt":
      computation = Math.sqrt(current)
      break
    case "X^1/3":
      computation = current ** (1/3)
      break
    case "ln":
      computation = Math.log(current)
      break
    case "log10":
      computation = Math.log10(current)
      break
    case "X^2":
      computation = current ** 2
      break
    case "X^3":
      computation = current ** 3
      break
    case "e^X":
      computation = Math.E ** current
      break
    case "10^X":
      computation = 10 ** current
      break
  }
  return computation.toString()
}

function evaluate({ currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "/":
      computation = prev / current
      break
    case "*":
      computation = prev * current
      break
    case "^1/":
      computation = prev ** (1 / current)
      break
    case "^":
      computation = prev ** current
  }
  return computation.toString()
}

function App() {
  const [
    {
      currentOperand, 
      previousOperand, 
      operation
    }, 
    dispatch
  ] = useReducer(reducer, {})
  return (
    <div className="external-grid">
      <div className="calculator-grid">
        <div className="gap"></div>
        <SingleOperandButton operation="tanh" dispatch={dispatch}/>
        <SingleOperandButton operation="sin" dispatch={dispatch}/>
        <SingleOperandButton operation="sqrt" dispatch={dispatch} />
        <SingleOperandButton operation="X^2" dispatch={dispatch} />
        <SingleOperandButton operation="X!" dispatch={dispatch} />
        <SingleOperandButton operation="cos" dispatch={dispatch} />
        <SingleOperandButton operation="X^1/3" dispatch={dispatch} />
        <SingleOperandButton operation="X^3" dispatch={dispatch} />
        <SingleOperandButton operation="1/X" dispatch={dispatch} />
        <SingleOperandButton operation="tan" dispatch={dispatch} />
        <OperationButton operation="^1/" dispatch={dispatch} />
        <OperationButton operation="^" dispatch={dispatch} />
        <SingleOperandButton operation="2^X" dispatch={dispatch} />
        <SingleOperandButton operation="sinh" dispatch={dispatch} />
        <SingleOperandButton operation="ln" dispatch={dispatch} />
        <SingleOperandButton operation="e^X" dispatch={dispatch} />
        <SingleOperandButton operation="log2" dispatch={dispatch} />
        <SingleOperandButton operation="cosh" dispatch={dispatch} />
        <SingleOperandButton operation="log10" dispatch={dispatch} />
        <SingleOperandButton operation="10^X" dispatch={dispatch} />
      </div>
      <div className="calculator-grid">
        <div className="result-bar">
          <div className="previous-operand">
            {previousOperand} {operation}
          </div>
          <div className="current-operand">
            {currentOperand}
          </div>
        </div>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
      </div>
    </div>
  );
}

export default App;
