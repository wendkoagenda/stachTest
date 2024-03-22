 // Routes dcnf_t--------------
 Route::get('/dcnf_t', [DCNFSController::class, 'index'])->middleware('check.permissions:dcnf_t.list');

