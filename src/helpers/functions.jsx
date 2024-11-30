export function formatUsPhone(phone) {
    var phoneTest = new RegExp(
      /^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/
    );
    var results = phoneTest.exec(phone);
    if (results !== null && results.length > 8) {
      return (
        "1 (" +
        results[3] +
        ") " +
        results[4] +
        "-" +
        results[5] +
        (typeof results[8] !== "undefined" ? " x" + results[8] : "")
      );
    } else {
      return phone;
    }
  }

  export function getIcon(call_type, direction) {
    if(call_type == "answered"){
        return <i
          className={
            direction == "inbound"
              ? "bi bi-telephone-inbound green"
              : "bi bi-telephone-outbound blue"
          }
        ></i>
        } else {
            return <i className="bi bi-telephone-x red"></i>
        }
  }
