import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor class LastPing() = this {
  stable var owner : Principal = Principal.fromActor(this);
  stable var backupWallet : ?Principal = null;
  stable var lastPing : Time.Time = Time.now();
  stable var timeout : Nat = 30 * 86_400_000_000_000; // 30 days in nanoseconds

  public shared(msg) func setBackup(p : Principal) : async () {
    assert (msg.caller == owner);
    backupWallet := ?p;
  };

  public shared(msg) func setTimeout(t : Nat) : async () {
    assert (msg.caller == owner);
    timeout := t;
  };

  public shared(msg) func ping() : async () {
    assert (msg.caller == owner);
    lastPing := Time.now();
  };

  public shared(msg) func claim() : async () {
    switch backupWallet {
      case (?backup) {
        assert (msg.caller == backup);
        assert (Time.now() > lastPing + timeout);
        owner := backup;
        lastPing := Time.now();
      };
      case null {
        assert false;
      };
    };
  };

  public query func getStatus() : async {
    owner : Principal;
    backupWallet : ?Principal;
    lastPing : Time.Time;
    timeout : Nat;
  } {
    {
      owner = owner;
      backupWallet = backupWallet;
      lastPing = lastPing;
      timeout = timeout;
    }
  };
}
