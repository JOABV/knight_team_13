package com.knight.app.Controller;

import com.knight.app.entities.Staff;
import com.knight.app.Repository.StaffRepository;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller    // This means that this class is a Controller
@CrossOrigin
@RequestMapping(path="/staff") // This means URL's start with /demo (after Application path)
public class StaffController {
	@Autowired
	private StaffRepository staffRepository;

	@PostMapping(path="/login")
	public @ResponseBody JSONObject login (@RequestBody JSONObject staff) {

		JSONObject jso = new JSONObject();
		Staff staff1 = staffRepository.findOne(staff.getString("phone_number"));
		if (staff1 == null) {
			jso.put("Checkcode", "200");
			jso.put("Message", "not exist");
		}else{
			if(staff1.getPassword().compareTo(staff.getString("password")) != 0){
				jso.put("Checkcode", "201");
				jso.put("Message", "wrong password");
			}else{
				jso.put("Checkcode", "100");
				jso.put("Message", "success");
			}
		}
		return jso;
	}
}
