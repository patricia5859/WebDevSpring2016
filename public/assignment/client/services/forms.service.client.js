(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

        function FormService($http) {
            var api = {
                createFormForUser: createFormForUser,
                findAllFormsForUser: findAllFormsForUser,
                findFormByFormId: findFormByFormId,
                deleteFormById: deleteFormById,
                updateFormById: updateFormById
            };
            return api;

            function createFormForUser(userId, form) {
                return $http.post("/api/assignment/user/" + userId + "/form", form);
            }

            function findAllFormsForUser(userId) {
                return $http.get("/api/assignment/user/" + userId + "/form");
            }

            function findFormByFormId(formId) {
                return $http.get("/api/assignmnet/form/" + formId);
            }

            function deleteFormById(formId) {
                return $http.delete("/api/assignment/form/" + formId);
            }

            function updateFormById(formId, newForm) {
                return $http.put("/api/assignment/form/" + formId, newForm);
            }
        }
})();