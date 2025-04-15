document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 6; // Number of items per page
  const blogItems = document.querySelectorAll("#blog .col-sm-6");
  const totalItems = blogItems.length;
  let totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage = 1;

  // Generate pagination dynamically
  function createPagination() {
    const paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = ""; // Clear existing pagination

    const prevButton = document.createElement("li");
    prevButton.innerHTML = '<a href="#" id="prev-page">Prev</a>';
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("li");
      pageLink.innerHTML = `<a href="#" class="page-link" data-page="${i}">${i}</a>`;
      paginationContainer.appendChild(pageLink);
    }

    const nextButton = document.createElement("li");
    nextButton.innerHTML = '<a href="#" id="next-page">Next</a>';
    paginationContainer.appendChild(nextButton);

    addPaginationEventListeners();
  }

  // Function to show items for the current page
  function showPage(page) {
    blogItems.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
          ? "block"
          : "none";
    });
    updatePagination(page);
  }

  // Function to update pagination links
  function updatePagination(page) {
    const paginationLinks = document.querySelectorAll(".page-link");
    paginationLinks.forEach((link) => {
      link.classList.remove("active");
      if (parseInt(link.dataset.page) === page) {
        link.classList.add("active");
      }
    });

    // Disable Prev/Next buttons if at the start/end
    document.querySelector("#prev-page").style.visibility =
      page === 1 ? "hidden" : "visible";
    document.querySelector("#next-page").style.visibility =
      page === totalPages ? "hidden" : "visible";
  }

  // Add event listeners for pagination links
  function addPaginationEventListeners() {
    document.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (!isNaN(page)) {
          currentPage = page;
          showPage(currentPage);
        }
      });
    });

    document.querySelector("#prev-page").addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });

    document.querySelector("#next-page").addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
  }

  // Recalculate total pages and recreate pagination if items change
  function updateItems() {
    totalPages = Math.ceil(blogItems.length / itemsPerPage);
    createPagination();
    showPage(1); // Reset to first page
  }

  // Initialize the first page view
  createPagination();
  showPage(currentPage);
});
