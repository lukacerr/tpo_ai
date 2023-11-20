export const UnitHasUser = (uid: number) => ({
  users: { some: { userId: uid } },
});
