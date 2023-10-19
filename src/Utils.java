/**
	@author Paul Bridier & Pierre Faber
 */

import java.sql.ResultSet;
import java.sql.SQLException;

public class Utils {

    public static boolean isEmpty(ResultSet target) {
        try {
            return !target.next();
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

}
