describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "/api/testing/reset");

		const user = {
			name: "Cypress User",
			username: "cypressUser",
			password: "cypressPassword",
		};

		cy.request("POST", "/api/users/", user);
		cy.visit("/");
	});

	it("Front page can be opened and Login Form is displayed as default", function () {
		cy.get("h2").contains("Log in").should("exist");

		cy.get("form").contains("username").should("exist");
		cy.get("form").contains("password").should("exist");
	});

	describe("Login", function () {
		it("Succeeds with correct credentials", function () {
			cy.get("input:first").type("cypressUser");
			cy.get("input:last").type("cypressPassword");
			cy.get("button").contains("login").click();

			cy.get("p").contains("Logged in as Cypress User");
		});

		it("Fails with wrong credentials", function () {
			cy.get("input:first").type("cypressUser");
			cy.get("input:last").type("wrong");
			cy.get("button").contains("login").click();

			cy.contains("Login failed.");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.get("input:first").type("cypressUser");
			cy.get("input:last").type("cypressPassword");
			cy.get("button").contains("login").click();
		});

		it("A blog can be created", function () {
			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test.com");
			cy.get("button").contains("Create").click();

			cy.reload();
			cy.get("p").contains("Blog Title");
		});

		it("A blog can be liked", function () {
			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test.com");
			cy.get("button").contains("Create").click();

			cy.reload();
			cy.get("p").contains("Blog Title");

			cy.get("button").contains("Expand").click();
			cy.get("button").contains("Like").click();

			cy.wait(4000);

			cy.get("p").contains("likes: 1").should("exist");
		});

		it("A blog can be deleted", function () {
			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test.com");
			cy.get("button").contains("Create").click();

			cy.reload();
			cy.get("p").contains("Blog Title");

			cy.get("button").contains("Expand").click();
			cy.get("button").contains("Delete").click();

			cy.reload();
			cy.get("p").contains("Blog Title").should("not.exist");
		});

		it("Only blog creator can see delete button", function () {
			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test.com");
			cy.get("button").contains("Create").click();

			cy.reload();
			cy.get("p").contains("Blog Title");

			const newUser = {
				name: "Cypress User 2",
				username: "cypressUser2",
				password: "cypressPassword",
			};

			cy.request("POST", "/api/users/", newUser);

			cy.get("button").contains("Log out").click();

			cy.get("input:first").type("cypressUser2");
			cy.get("input:last").type("cypressPassword");
			cy.get("button").contains("login").click();

			cy.get("p").contains("Blog Title");

			cy.get("button").contains("Expand").click();
			cy.get("button").contains("Delete").should("not.exist");
		});

		it("Blogs are correctly ordered by likes", function () {
			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title 1");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test1.com");
			cy.get("button").contains("Create").click();

			cy.reload();

			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title 2");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test2.com");
			cy.get("button").contains("Create").click();

			cy.reload();

			cy.get("button").contains("Create a new blog post").click();

			cy.get("input#title").type("Blog Title 3");
			cy.get("input#author").type("Cypress Author");
			cy.get("input#url").type("https://test3.com");
			cy.get("button").contains("Create").click();

			cy.reload();

			// expand blog 3
			cy.get("button").eq(4).click();

			// like blog 2 three times
			cy.get("button").contains("Like").click();

			cy.wait(4000);
			cy.get("p").contains("likes: 1").should("exist");

			cy.get("button").contains("Like").click();

			cy.wait(4000);
			cy.get("p").contains("likes: 2").should("exist");

			cy.get("button").contains("Like").click();

			cy.reload();

			cy.get(".blog").eq(0).contains("Blog Title 3");
		});
	});
});
