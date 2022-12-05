import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducers(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.INTERRUPUT_CURRENT_CYCLE:
      return {
        activeCycleId: null,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          }

          return cycle
        }),
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        activeCycleId: null,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          }

          return cycle
        }),
      }
    default:
      return state
  }
}
