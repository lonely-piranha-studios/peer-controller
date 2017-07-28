// @flow


export default interface IValue {
  set(): void;
  get(): any;
  changed(): bool;
}

