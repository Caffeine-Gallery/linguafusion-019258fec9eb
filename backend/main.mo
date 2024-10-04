import Text "mo:base/Text";

actor {
  public query func healthcheck() : async Text {
    return "Backend is healthy!";
  };
}
