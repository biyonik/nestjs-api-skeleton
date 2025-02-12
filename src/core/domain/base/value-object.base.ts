export abstract class ValueObject {
  protected abstract getEqualityComponents(): Array<any>;

  public equals(other: ValueObject): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this === other) {
      return true;
    }
    if (this.constructor !== other.constructor) {
      return false;
    }
    const thisComponents = this.getEqualityComponents();
    const otherComponents = other.getEqualityComponents();

    return this.arraysEqual(thisComponents, otherComponents);
  }

  private arraysEqual(array1: Array<any>, array2: Array<any>): boolean {
    return (
      array1.length === array2.length &&
      array1.every((element, index) => element === array2[index])
    );
  }
}
