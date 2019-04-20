package com.knight.app.Controller;

import com.knight.app.Model.Policy;
import com.knight.app.Model.User;
import com.knight.app.Repository.PolicyRepository;
import com.knight.app.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller    // This means that this class is a Controller
@CrossOrigin
@RequestMapping(path="/user") // This means URL's start with /user (after Application path)
public class UserController {
	@Autowired // This means to get the bean called userRepository
	           // Which is auto-generated by Spring, we will use it to handle the data
	private UserRepository userRepository;
	private PolicyRepository policyRepository;

	@GetMapping("/homepage")
	public String index(){
		return "homepage";
	}

	@PostMapping(path="/register") // Map ONLY GET Requests
	public @ResponseBody String addNewUser (@RequestBody User user
			/*, @RequestBody String password*/) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		if (userRepository.existsById(Integer.valueOf(user.getPhone()))){
			return "Wrong: the user already exists";
		}

		User n = new User();
		n.setPhone(user.getPhone());
		n.setPassword(user.getPassword());
		n.setId(Integer.parseInt(user.getPhone()));
		userRepository.save(n);
		return "Success Saved id:"+n.getId();

	}

	@PostMapping(path="/login") // Map ONLY POST Requests
	public @ResponseBody String login (@RequestBody User user) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

        User user1 = userRepository.findById(Integer.valueOf(user.getPhone())).orElse(null);

		if (user1 == null){
            if (! userRepository.existsById(Integer.valueOf(user.getPhone()))){
                return "not exist";
            }else{
                return "wrong password ";
            }
		}else{
            return "account.html";
		}
	}

	@PostMapping(path="/lost_luggage") // Map ONLY POST Requests
	public @ResponseBody String lost_luggage (@RequestBody Policy policy) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		if (policyRepository.existsById(policy.getId())){
			return "It already exists";
		}

		policyRepository.save(policy);
		return "Saved";
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<User> getAllUsers() {
		// This returns a JSON or XML with the users
		return userRepository.findAll();
	}

}
