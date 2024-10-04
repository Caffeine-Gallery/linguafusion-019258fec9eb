export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'healthcheck' : IDL.Func([], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => { return []; };
